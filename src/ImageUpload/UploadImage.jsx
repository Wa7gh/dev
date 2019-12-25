import { storage } from "./config";

export const fileUploadHandler = async uploded_img => {
  const UploadTask = storage
    .ref(`prodimg/${uploded_img.name}`)
    .put(uploded_img);

  UploadTask.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("prodimg")
        .child(uploded_img.name)
        .getDownloadURL()
        .then();
    }
  );
};

export const getImagesUrl = async imagename => {
  return storage
    .ref("prodimg")
    .child(imagename)
    .getDownloadURL();
};
