"use client";
import { useState } from "react";

export default function NotificationButton() {
    const [permission, setPermission] = useState(Notification.permission);

    const requestNotificationPermission = async () => {
        if ("Notification" in window) {
            const result = await Notification.requestPermission();
            setPermission(result);
            if (result === "granted") {
                new Notification("Notifications enabled!", {
                    body: "You will now receive updates.",
                });
            }
        }
    };

    return permission !== "granted" ? (
        <button onClick={requestNotificationPermission} className="p-2 bg-green-500 text-white rounded">
            Enable Notifications
        </button>
    ) : (
        <p className="text-green-600">Notifications are enabled!</p>
    );
}
