import Image from "next/image";
import { Inter } from "next/font/google";
import PhotoUploadModal from "@/components/PhotoUploadModal";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { 
  Button 
} from "@chakra-ui/react";
import CommentSection from "@/components/CommentSection";

const inter = Inter({ subsets: ["latin"] });

export interface PhotoComment {
  content: string;
  createdAt: string;
}

export interface Photo {
  fileName: string;
  comments: PhotoComment[];
}

export default function Home() {
  const { 
    isOpen: isOpenPhotoUploadModal, 
    onOpen: onOpenPhotoUploadModal, 
    onClose: onClosePhotoUploadModal 
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_API}/photos`);
    setIsLoading(false);

    if (response.ok) {
      const photos = await response.json();
      setPhotos(photos);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDonePhotoUpload = () => {
    fetchPhotos();
    onClosePhotoUploadModal();
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold">Photo Gallery</h1>
      <div className="flex flex-col justify-center">
        {photos.map((photo) => (
          <div key={photo.fileName} className="w-md mb-[20px] p-[20px] border-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_DEV_API}/photos/${photo.fileName}`}
              alt="Photo"
              width={400}
              height={400}
              className="m-auto mb-[10px]"
            />
            <CommentSection photo={photo} />
          </div>
        ))}
      </div>
      <Button
        colorScheme="blue"
        onClick={onOpenPhotoUploadModal}
        isLoading={isLoading}
      >
        Upload
      </Button>
      <PhotoUploadModal
        isOpen={isOpenPhotoUploadModal}
        onClose={onClosePhotoUploadModal}
        onDone={handleDonePhotoUpload}
      />
    </main>
  );
}
