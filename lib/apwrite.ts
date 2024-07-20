import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  Platform: 'com.akhtar.aora',
  projectId: '669ad23c0028d0659c8b',
  databaseId: '669ad362002796de7ed7',
  userCollectionId: '669ad380003e26f92b32',
  videoCollectionId: '669ad3c600138ef824f5',
  storageId: '669ad541003e1e2affc6',
}

// Init your React Native SDK
const client = new Client()

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.Platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)
export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)
    if (!newAccount) {
      throw new Error('Failed to create user')
    }
    const avatarUrl = await avatar.getInitials(username)
    await signIn(email, password)
    const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    })
    return newUser
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create user')
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.error(error)
    throw new Error('Failed to sign in')
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw new Error('Failed to get user')
    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ])
    if (!currentUser) throw new Error('Failed to get user')
    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get user')
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId)
    if (!posts) throw new Error('Failed to get posts')
    return posts.documents
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get posts')
  }
}
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(7),
    ])
    if (!posts) throw new Error('Failed to get posts')
    return posts.documents
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get posts')
  }
}