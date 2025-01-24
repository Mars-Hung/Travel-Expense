import { initializeApp } from 'firebase/app';
import { saveUserToSupabase } from './supabase-service';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // 其他配置
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // 將用戶資訊存入 localStorage 和 Supabase
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }));

        await saveUserToSupabase({
            id: user.uid,
            email: user.email,
            name: user.displayName
        });

        return user;
    } catch (error) {
        console.error('Google登入錯誤', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
    } catch (error) {
        console.error('登出錯誤', error);
    }
};