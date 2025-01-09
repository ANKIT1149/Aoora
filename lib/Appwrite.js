import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { useGlobalcontext } from "../context/GlobalProvider";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.asm.aoora",
  projectId: "676ba2cb003146af708f",
  databaseId: "676ba6d7000987de053c",
  userCollectionId: "676ba7350002ceddec4b",
  videoCollectionId: "676ba77a001f7e05890b",
  storageId: "677bb1d20006fe6bb46c",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
// const sdk = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export const CreateUser = async (email, password, username) => {
  const generateUserId = () => {
    return `user_${Date.now()}`; // Creates a unique ID like "user_1695634487123"
  };
  try {
    const newUser = await account.create(
      generateUserId(),
      email,
      password,
      username
    );

    if (!newUser) return console.log("this account is already exsist");

    const avatarUrl = avatars.getInitials(username);

    await signin(email, password);

    const newUsers = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newUser.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUsers;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// const checkSession = async () => {
//   try {
//     const session = await account.getSession();
//     if (session.session.length > 0) {
//       console.log("Active session found", session);
//     }
//     return true;
//   } catch (error) {
//     console.log("No active session", error.message);
//   }
// };

// const deleteSession = async () => {
//   try {
//     await account.deleteSession();
//     console.log("All active session deleted");
//   } catch (error) {
//     console.log("Unable to delete the session", error.message);
//   }
// };

export const signin = async (email, password) => {
  console.log("Email provided:", email);
  console.log("Password length:", password.length);
  try {
    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created successfully:", session);

    return session;
  } catch (error) {
    if (error.message.includes("active session")) {
      console.error("Error: A session is already active. Log out first.");
    } else {
      console.error("Error during login:", error.message);
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllposts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllatestposts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// here i filter my databases

export const getprofileDetail = async ($id) => {
  try {
    console.log("Querying with ID:", $id);

    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("users", $id)] // Ensure field name is correct
    );

    console.log("Fetched posts:", JSON.stringify(posts, null, 2));

    if (!posts.documents.length) {
      console.warn("No matching documents found for ID:", $id);
    }

    return posts.documents;
  } catch (error) {
    console.error("Error fetching profile details:", error.message);
    throw new Error("Failed to fetch profile details");
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error();
    }

    if (!fileUrl) {
      throw Error;
    }

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const { mimeType, ...rest } = file;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  console.log('File', file)
  try {
    const upload = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    console.log('Uploaded', upload);
     console.log(upload.$id);
    const fileUrl = getFilePreview(upload.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};



export const createvideoPost = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.videos, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        videos: videoUrl,
        prompt: form.prompt,
        users: form.userId
      }
    );

    return newPost
  } catch (error) {
    throw new Error(error);
  }
};
