import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Helper functions for common Firestore operations
 */

// Generic get document by ID
export async function getDocumentById<T>(collectionName: string, docId: string): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    throw error;
  }
}

// Generic create document
export async function createDocument<T>(collectionName: string, data: T, docId?: string): Promise<string> {
  try {
    if (docId) {
      await setDoc(doc(db, collectionName, docId), {
        ...data,
        createdAt: serverTimestamp()
      });
      return docId;
    } else {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

// Generic update document
export async function updateDocument<T>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

// Generic delete document
export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

// Query documents with conditions
export async function queryDocuments<T>(
  collectionName: string,
  conditions: Array<{ field: string; operator: any; value: any }>
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef);
    
    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator, condition.value));
    });
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
}

// Get all documents from a collection
export async function getAllDocuments<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error(`Error fetching all documents from ${collectionName}:`, error);
    throw error;
  }
}

// Check if document exists
export async function documentExists(collectionName: string, docId: string): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error(`Error checking document existence in ${collectionName}:`, error);
    throw error;
  }
}
