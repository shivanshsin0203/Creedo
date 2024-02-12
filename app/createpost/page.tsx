"use client";
import Image from "next/image";
import { use, useCallback, useEffect, useState } from "react";
import { useDropzone, FileError } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
interface FileWithPreview extends File {
  preview: string;
}

interface RejectedFile {
  file: File;
  errors: FileError[];
}

const Dropzone = () => {
    const {user,isAuthenticated}=useKindeBrowserClient();
    const router=useRouter();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);
  const [title, setTitle] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [discription, setDiscription] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  
  async function handlePost() {
    if(!isAuthenticated){
      router.push('/api/auth/login')
      return;
    }
    const result = await axios.post("http://localhost:3005/createpost", {
        creator: user?.email,
        title: title,
        discription: discription,
        image: image,
        });
      toast("Post Created",{className:"bg-green-500"});
      socket.emit("new_post", { creator: user?.email,name:user?.given_name });
      router.push("/");
  }
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as FileWithPreview
        ),
      ]);
    }

    if (rejectedFiles.length) {
      setRejected((previousFiles) => [
        ...previousFiles,
        ...rejectedFiles.map((file) => ({
          file,
          errors: (file as any).errors || [], // 'errors' property may not exist in File type
        })),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((prevFiles) =>
      prevFiles.filter(({ file }) => file.name !== name)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isAuthenticated){
      router.push('/api/auth/login')
      return;
    }
    if (!files.length) return;

    // const formData = new FormData();
    // files.forEach((file) => formData.append('file', file));
    // formData.append('upload_preset', 'creedo');
    // console.log(formData);
    // console.log(files);
    // const URL = 'https://api.cloudinary.com/v1_1/doxbh0cjv/image/upload';
    // const data = await fetch(URL, {
    //   method: 'POST',
    //   body: formData,
    // }).then((res) => res.json());
    files.forEach(async (file) => {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "creedo");
      console.log(formData);
      console.log(files);
      const URL = "https://api.cloudinary.com/v1_1/doxbh0cjv/image/upload";
      const data = await fetch(URL, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      console.log(data);
      toast("Image Uploaded");
      setImage((prev:any) => [...prev, data.secure_url]);
    });
  };
  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    newSocket.on("connect", () => {
      console.log("connected");
    });

    setSocket(newSocket);
  }, [user]); 
  return (
    <div className="w-screen h-screen bg-black">
      <div className=" text-slate-200 font-semibold text-3xl p-4 text-center mb-5">
        Create Post
      </div>
      <div className=" text-slate-300 text-2xl p-4">Title</div>
      <div className=" flex space-x-1 items-center">
        <input
          type="text"
          placeholder="Title"
          className="bg-gray-700 text-white border border-gray-600 rounded-sm py-1 px-3 focus:outline-none focus:border-blue-500 w-[80%] h-[50px] ml-3"
          onChange={(e) => {
            if (e.target.value.length <= 30) {
              setTitle(e.target.value);
            } else {
              toast("Title should be less than 30 characters");
            }
          }}
        />
        <div className=" text-sm text-slate-400">{`${title.length}/30`}</div>
      </div>
      <div className=" text-slate-300 text-2xl p-4 mt-4">Discription</div>
       <div className=" flex space-x-1 items-center">
       <textarea
          
          placeholder="Discription [Optional]"
          className="bg-gray-700 text-white border border-gray-600 rounded-sm py-1 px-3 focus:outline-none focus:border-blue-500 w-[80%] h-[150px] ml-3"
          onChange={(e) => {
            if (e.target.value.length <= 600) {
              setDiscription(e.target.value);
            } else {
              toast("Discription should be less than 600 characters");
            }
          }}
        />
                <div className=" text-sm text-slate-400">{`${discription.length}/600`}</div>

       </div>
       <div className=" flex mt-1 justify-end space-x-5 items-center mr-[20%] ">
        <span className=" text-slate-400 text-sm">Upload Image if you want before Posting</span>
        <Button variant={"secondary"} className=" hover:scale-110 hover:bg-slate-300" onClick={handlePost} >Post</Button>
       </div>
      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps({
            className: `p-16 mt-10 border border-neutral-500 bg-slate-900 `,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 ">
            <ArrowUpTrayIcon className="w-5 h-5 fill-current text-white" />
            {isDragActive ? (
              <p className=" text-slate-300">Drop the files here ...</p>
            ) : (
              <p className=" text-slate-300">
                Drag & drop files here, or click to select files
              </p>
            )}
          </div>
        </div>

        {/* Preview */}
        <section className="mt-10 bg-black">
          <div className="flex gap-4 p-4 bg-black">
            <h2 className="title text-3xl font-semibold text-slate-200 p-2">
              Preview
            </h2>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-400 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
            >
              Remove all files
            </button>
            <button
              type="submit"
              className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-300 border border-purple-500 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
            >
              Upload
            </button>
          </div>

          {/* Accepted files */}
          <h3 className="title text-lg font-semibold text-neutral-300 mt-10 border-b pb-3 border-b-slate-500 p-2">
            Accepted Files
          </h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10 p-3">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                />
                <button
                  type="button"
                  className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-red-600 transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <XMarkIcon className="w-5 h-5 fill-red-200 hover:fill-secondary-400 transition-colors text-black" />
                </button>
                <p className="mt-2 text-neutral-300 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Rejected Files */}
          <div className=" bg-black">
            <h3 className="title text-lg font-semibold text-neutral-300 mt-24 border-b pb-3  border-b-slate-500 bg-black p-2">
              Rejected Files
            </h3>
            <ul className="mt-6 flex flex-col bg-black">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between bg-black"
                >
                  <div>
                    <p className="mt-2 text-neutral-300 text-sm font-medium">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-300 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Dropzone;
