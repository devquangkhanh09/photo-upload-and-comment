import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
  Input
} from "@chakra-ui/react"
import Image from "next/image";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

const PhotoUploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onDone,
}) => {
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_API}/photos`, {
      method: 'POST',
      body: formData,
    });
    setIsUploading(false);

    if (response.ok) {
      setFile(undefined);
      onDone();
    } else {
      alert('Failed to upload.');
    }
  };

  const handleClose = () => {
    setFile(undefined);
    onClose();
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert('The file is too large.');
      } else {
        setFile(file);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          The maximum file size is 10MB.
          <FormControl>
            <FormLabel>File</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleSelectFile}
            />
          </FormControl>
          <br />
          {file && <Image
            style={{ margin: '0 auto' }}
            src={file ? URL.createObjectURL(file) : ''}
            alt="preview"
            width={200}
            height={200}
          />}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleUploadFile}
            disabled={!file || isUploading}
            isLoading={isUploading}
          >
            Upload
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PhotoUploadModal;