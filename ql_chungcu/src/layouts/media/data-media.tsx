"use client";

import {useState, useEffect} from "react";
import {
    Image as ImageIcon,
    Video as VideoIcon,
    X,
    ZoomIn,
    ZoomOut,
    RotateCw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs.tsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button.tsx";
import type {listMediaFile} from "@/types/MediaFile.ts";

interface DataMediaProps {
    mediaFiles?: listMediaFile | null;
    title?: string;
    showCard?: boolean;
    imageGridCols?: string;
    videoGridCols?: string;
}

export function DataMedia({
                              mediaFiles,
                              title = "Tệp đính kèm",
                              showCard = true,
                              imageGridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                              videoGridCols = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
                          }: DataMediaProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
    const [imageZoom, setImageZoom] = useState(1);
    const [imageRotation, setImageRotation] = useState(0);

    const handleZoomIn = () => setImageZoom((prev) => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setImageZoom((prev) => Math.max(prev - 0.25, 0.5));
    const handleRotate = () => setImageRotation((prev) => (prev + 90) % 360);
    const resetImageView = () => {
        setImageZoom(1);
        setImageRotation(0);
    };

    const handlePrevImage = () => {
        if (selectedImageIndex !== null && mediaFiles) {
            const newIndex =
                selectedImageIndex > 0
                    ? selectedImageIndex - 1
                    : mediaFiles.image.length - 1;
            setSelectedImageIndex(newIndex);
            resetImageView();
        }
    };

    const handleNextImage = () => {
        if (selectedImageIndex !== null && mediaFiles) {
            const newIndex =
                selectedImageIndex < mediaFiles.image.length - 1
                    ? selectedImageIndex + 1
                    : 0;
            setSelectedImageIndex(newIndex);
            resetImageView();
        }
    };

    const handlePrevVideo = () => {
        if (selectedVideoIndex !== null && mediaFiles) {
            const newIndex =
                selectedVideoIndex > 0
                    ? selectedVideoIndex - 1
                    : mediaFiles.video.length - 1;
            setSelectedVideoIndex(newIndex);
        }
    };

    const handleNextVideo = () => {
        if (selectedVideoIndex !== null && mediaFiles) {
            const newIndex =
                selectedVideoIndex < mediaFiles.video.length - 1
                    ? selectedVideoIndex + 1
                    : 0;
            setSelectedVideoIndex(newIndex);
        }
    };

    // Handle mouse wheel zoom
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (selectedImageIndex !== null) {
                e.preventDefault();
                const delta = e.deltaY; //giá trị thể hiện độ cuộn theo trục dọc

                if (delta < 0) { // cuon len
                    // Scroll up - zoom in
                    setImageZoom((prev) => Math.min(prev + 0.1, 3)); // tang gia tri zoom len 0.1 va neu lon hon 3 thi lay 3
                } else {
                    // Scroll down - zoom out
                    setImageZoom((prev) => Math.max(prev - 0.1, 0.5)); // giam gia tri zoom di 0.1 va neu nho hon 0.5 thi lay 0.5
                }
            }
        };

        if (selectedImageIndex !== null) {
            window.addEventListener("wheel", handleWheel, {passive: false});
        }

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [selectedImageIndex]);

    if (
        !mediaFiles ||
        (mediaFiles.image.length === 0 && mediaFiles.video.length === 0)
    ) {
        return null;
    }

    const MediaContent = () => (
        <Tabs
            defaultValue={mediaFiles.image.length > 0 ? "images" : "videos"}
            className="w-full"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="images" disabled={mediaFiles.image.length === 0}>
                    <ImageIcon className="h-4 w-4 mr-2"/>
                    Hình ảnh ({mediaFiles.image.length})
                </TabsTrigger>
                <TabsTrigger value="videos" disabled={mediaFiles.video.length === 0}>
                    <VideoIcon className="h-4 w-4 mr-2"/>
                    Video ({mediaFiles.video.length})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="mt-4">
                <div className={`grid ${imageGridCols} gap-6`}>
                    {mediaFiles.image.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300 aspect-square"
                            onClick={() => {
                                setSelectedImageIndex(index);
                                resetImageView();
                            }}
                        >
                            <img
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                                    <span className="text-white text-sm font-medium">Ảnh {index + 1}</span>
                                    <ZoomIn className="h-5 w-5 text-white"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-4">
                <div className={`grid ${videoGridCols} gap-6`}>
                    {mediaFiles.video.map((videoUrl, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                            onClick={() => setSelectedVideoIndex(index)}
                        >
                            <video
                                src={videoUrl}
                                className="w-full h-auto min-h-[300px] max-h-[400px] object-contain bg-black rounded-xl"
                                controls={false}
                            />
                            <div
                                className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                                <div
                                    className="bg-white rounded-full p-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 shadow-xl">
                                    <VideoIcon
                                        className="h-10 w-10 text-primary group-hover:text-white transition-colors duration-300"/>
                                </div>
                            </div>
                            <div
                                className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg font-medium">
                                Video {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );

    return (
        <>
            {showCard ? (
                <Card className="gap-0">
                    <CardHeader>
                        <CardTitle className="text-lg">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MediaContent/>
                    </CardContent>
                </Card>
            ) : (
                <MediaContent/>
            )}

            {/* Image Viewer Modal */}
            {selectedImageIndex !== null && mediaFiles && (
                <Dialog
                    open={true}
                    onOpenChange={() => {
                        setSelectedImageIndex(null);
                        resetImageView();
                    }}
                >
                    <DialogContent className="max-h-[98vh] p-0 border-0 bg-black/95" showCloseButton={false}>
                        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                            {/* Close Button */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute top-6 right-6 z-20 bg-white/90 hover:bg-white border-2 border-gray-200 rounded-full shadow-xl w-12 h-12 transition-all duration-200 hover:scale-110"
                                onClick={() => {
                                    setSelectedImageIndex(null);
                                    resetImageView();
                                }}
                            >
                                <X className="h-6 w-6 text-gray-800"/>
                            </Button>

                            {/* Image Counter */}
                            <div
                                className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl">
                                <span
                                    className="text-sm font-medium">{selectedImageIndex + 1} / {mediaFiles.image.length}</span>
                            </div>

                            {/* Zoom Controls + Navigation */}
                            <div
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-xl">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-full hover:cursor-pointer"
                                    onClick={handleZoomOut}
                                    disabled={imageZoom <= 0.5}
                                >
                                    <ZoomOut className="h-5 w-5"/>
                                </Button>
                                <span
                                    className="text-sm font-medium min-w-[60px] text-center">{Math.round(imageZoom * 100)}%</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-full hover:cursor-pointer"
                                    onClick={handleZoomIn}
                                    disabled={imageZoom >= 3}
                                >
                                    <ZoomIn className="h-5 w-5"/>
                                </Button>
                                <div className="w-px h-6 bg-gray-300 mx-1"/>
                                {mediaFiles.image.length > 1 && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-full hover:cursor-pointer"
                                            onClick={handlePrevImage}
                                        >
                                            <ChevronLeft className="h-8 w-8 text-gray-800"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 rounded-full hover:cursor-pointer"
                                            onClick={handleNextImage}
                                        >
                                            <ChevronRight className="h-8 w-8 text-gray-800"/>
                                        </Button>
                                    </>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-full hover:cursor-pointer"
                                    onClick={handleRotate}
                                >
                                    <RotateCw className="h-5 w-5"/>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 px-4 rounded-full hover:cursor-pointer"
                                    onClick={resetImageView}
                                >
                                    Reset
                                </Button>
                            </div>

                            {/* Image */}
                            <img
                                src={mediaFiles.image[selectedImageIndex]}
                                alt={`Image ${selectedImageIndex + 1}`}
                                className="max-w-full max-h-[90vh] object-contain transition-all duration-300 cursor-move"
                                style={{
                                    transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
                                }}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Video Viewer Modal */}
            {selectedVideoIndex !== null && mediaFiles && (
                <Dialog
                    open={true}
                    onOpenChange={() => setSelectedVideoIndex(null)}
                >
                    <DialogContent className="max-w-[95vw] max-h-[95vh] p-6 bg-black/95" showCloseButton={false}>
                        <DialogHeader className="pb-4">
                            <DialogTitle className="text-xl font-semibold">
                                <div className="text-white"> Xem video
                                    ({selectedVideoIndex + 1} / {mediaFiles.video.length})
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 border-2 border-gray-200 rounded-full shadow-lg w-10 h-10 transition-all duration-200 hover:scale-110"
                                    onClick={() => setSelectedVideoIndex(null)}
                                >
                                    <X className="h-5 w-5 text-gray-800"/>
                                </Button>
                            </DialogTitle>
                        </DialogHeader>

                        <div className="w-full">
                            <video
                                key={selectedVideoIndex}
                                src={mediaFiles.video[selectedVideoIndex]}
                                className="w-full h-auto max-h-[80vh] rounded-xl shadow-2xl"
                                controls
                                autoPlay
                            />
                        </div>

                        {mediaFiles.video.length > 1 && (
                            <div
                                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-xl justify-center">
                                {/* Navigation Buttons for Video */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 px-4 rounded-full hover:cursor-pointer"
                                    onClick={handlePrevVideo}
                                >
                                    <ChevronLeft className="h-6 w-6 text-gray-800"/>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 px-4 rounded-full hover:cursor-pointer"
                                    onClick={handleNextVideo}
                                >
                                    <ChevronRight className="h-6 w-6 text-gray-800"/>
                                </Button>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
        ;
}
