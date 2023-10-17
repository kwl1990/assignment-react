import { useState } from "react";
import ToastContext from "./ToastService";

export default function ToastProvider({children}){
    const [toasts, setToasts] = useState([]);
    const open = (component, timeout = 3000) => {
        const id = Date.now();
        setToasts(toasts => [... toasts, {id, component}])
        setTimeout(() => close(id), timeout);
    }

    const close = (id) => setToasts(toasts => toasts.filter(toast => toast.id != id));

    return (
        <ToastContext.Provider value={{open, close}}>
            {children}
            <div className="space-y-2 absolute bottom-4 right-4">
                {toasts.map(({id, component}) => (
                    <div key={id} className="relative">
                        {component}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}