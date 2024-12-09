import { IconButton } from "@material-tailwind/react";
import React from "react";

const DropboxImage = () => {
  return (
    <div className="relative w-full flex flex-col p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div>
        <img
          src="/images/cute_dog.webp"
          className="w-full aspect-square rounded-2xl"
        />
      </div>
      {/* Image FIle name */}
      <div>cutedog.jped</div>

      <div className="absolute top-4 right-4">
        <IconButton onClick={() => {}} color="red">
          <i className="fas fa-trash" />
        </IconButton>
      </div>
    </div>
  );
};

export default DropboxImage;
