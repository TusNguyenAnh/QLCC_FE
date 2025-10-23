import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useContext, useEffect, useState} from "react";
import {toast, Toaster} from "sonner";
import {Loader2} from "lucide-react";
import {handleAxiosStatusCode} from "@/utils/request.ts";
import {getProfile, login} from "@/apis/authAPI.ts";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "@/context/AuthContext.tsx";
import {findByIdAPI} from "@/apis/orgAPI.ts";

// Định nghĩa schema Zod
const schema = z.object({
    username: z.string().min(1, "Tên đăng nhập không được để trống"),
    password: z.string().optional(),
})

export type LoginFormSchema = z.infer<typeof schema>

export function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user,setUser,setComplex,setOrgManage} = useContext(AuthContext);


    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await login(data);
            const userInfo = await getProfile();
            const org = await findByIdAPI(userInfo.resident.org_id);
            setUser(userInfo);
            setOrgManage(org.id);
            setComplex(org.complex_id);
            toast.success("Đăng nhập thành công!");
            navigate("/");
        } catch (err) {
            handleAxiosStatusCode(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");  // ✅ An toàn
        }
    }, [user, navigate]);

    if (user) return null;

    return (
        <div className="flex items-center justify-center min-h-screen"
             style={{backgroundColor: `color-mix(in oklab, var(--color-black) 50%, transparent)`}}>
            <Card className="w-full max-w-sm">
                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mr-1"/>Loading...
                    </div>
                )}

                <form className="grid gap-4"
                      onSubmit={handleSubmit((data) => {
                          // Gửi ngược data + id lên cha
                          onSubmit(data)
                      })}>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your username below to login to your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>

                                <Input id="username" {...register("username")} autoComplete="username"
                                />
                                {errors.username &&
                                    <p className="text-sm text-red-500">{errors.username.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        tabIndex={-1}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline tab"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" {...register("password")} type="password"
                                       autoComplete="current-password"
                                />
                                {errors.password &&
                                    <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <Toaster position="bottom-left" richColors/>
        </div>

    )
}
