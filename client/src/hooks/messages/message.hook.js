import {useCallback} from 'react';
import './messages.css';

export const useMessage = () => {
    return useCallback((text) => {
        if(window.M && text){
            window.M.toast({ html: text, classes: 'messages' });
        }
    }, [])
}