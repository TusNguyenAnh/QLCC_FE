import {z} from "zod";
import {useContext, useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AuthContext} from "@/context/AuthContext.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getAllBdAPI} from "@/apis/bdAPI.ts";
import {findByIdAPI} from "@/apis/orgAPI.ts";
import type {bdItemCheckbox} from "@/types/Building.ts";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {Combobox} from "@/components/ui/combobox.tsx";
import {FilterX, Search} from "lucide-react";

const schema = z.object({
    building_id: z.string().optional(),
    floor: z.string().optional(),
    apt_number: z.string().optional(),
});

export type FilterResUserFormSchema = z.infer<typeof schema>;

type ComponentProps = {
    onSubmit?: (filterResUser: FilterResUserFormSchema) => void;
    loading?: boolean;
};
export default function FilterUserResForm({onSubmit}: ComponentProps) {
    const {
        register,
        watch,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: {errors},
    } = useForm<FilterResUserFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            building_id: "",
            floor: "0",
            apt_number: "",
        },
    });

    const [buildings, setBuildings] = useState<
        { value: string; label: string }[]
    >([]);
    const [floors, setFloors] = useState<{ value: string; label: string }[]>([]);
    const building_id = watch("building_id");
    const floor = watch("floor");
    const apt_number = watch("apt_number");

    const {complex, orgManage} = useContext(AuthContext);

    useEffect(() => {
        getAllBuilding();
    }, []);

    const getAllBuilding = async () => {
        try {
            let data = await getAllBdAPI();

            if (orgManage) {
                // Lọc toà nhà theo orgManage
                const bdByOrg = await findByIdAPI(orgManage);
                data = data.filter((item) => bdByOrg.building.includes(item.id));
            }

            const items = data.map(function (item: bdItemCheckbox) {
                return {
                    value: item.id,
                    label: item.building_name,
                };
            });
            setBuildings(items);
        } catch (err) {
            handleAxiosStatusCode(err);
        }
    };

    const hasFilters = building_id || floor || apt_number;

    return (
        <form
            onSubmit={handleSubmit((data) => {
                // Gửi ngược data + id lên cha
                if (onSubmit) {
                    onSubmit(data);
                }
            })}
        >
            {/* Filter Controls */}
            <div className="flex flex-wrap items-end gap-3">
                {/* Building Filter */}
                <div className="flex-1 min-w-[200px]">
                    <Label
                        htmlFor="building_id"
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    >
                        Tòa nhà
                    </Label>
                    <Controller
                        control={control}
                        name="building_id"
                        render={({field}) => (
                            <Combobox
                                items={buildings}
                                onChange={(value) => field.onChange(value)}
                                itemUpdate={field.value || ""}
                            />
                        )}
                    />
                </div>

                {/* Floor Filter */}
                <div className="flex-1 min-w-[180px]">
                    <Label
                        htmlFor="floor"
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    >
                        Tầng
                    </Label>
                    <Input id="floor" {...register("floor", {
                        setValueAs: (v) => (v == 0 ? "" : v)
                    })}
                           type="number"
                           min="0" max="100"
                           step="1"/>
                </div>

                {/* Apartment Number Filter */}
                <div className="flex-1 min-w-[180px]">
                    <Label
                        htmlFor="apt_number"
                        className="text-sm font-medium text-gray-700 mb-1.5 block"
                    >
                        Số căn hộ
                    </Label>
                    <Input id="apt_number" {...register("apt_number", {
                        setValueAs: (v) => (v == 0 ? "" : v)
                    })}
                    />
                </div>

                {/* Action Buttons */}
                {hasFilters && (
                    <Button
                        variant="outline"
                        type="button"
                        size="default"
                        onClick={() => {
                            setValue("building_id", "");
                            setValue("apt_number", "");
                            setValue("floor", "0");
                        }}
                        className="gap-2"
                    >
                        <FilterX className="h-4 w-4"/>
                        Xóa
                    </Button>
                )}
                <Button type="submit" size="default" className="gap-2">
                    Áp dụng
                </Button>
            </div>
        </form>
    );
}
