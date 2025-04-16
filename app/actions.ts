"use server";
import webPush from "web-push";

webPush.setVapidDetails(
    "mailto:giolo.evora@gmail.com",
    "BK-3-1ryhM8FY0zTTOvZy1yYZAlr2T9kOLq53b87EIuaYF0KdAUhAUDeu8cEzbPHMwzSSEc_-iQx1jG5RtBvUqE",
    "wEv_qL9cbG14CzKNDDoJPIq3lWoV_ehXdXz2MEGXflY"
);

let subscription: any = null;

export async function subscribeUser(sub: PushSubscription) {
    subscription = {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        keys: (sub as any).toJSON().keys, 
    };

    return { success: true };
}

export async function unsubscribeUser() {
    subscription = null;
 
    return { success: true };
}

export async function sendNotification(message: string) {
    if (!subscription) {
        throw new Error("No subscription available");
    }

    try {
        await webPush.sendNotification(
            subscription,
            JSON.stringify({
                title: "Test Notification",
                body: message,
                icon: "/icon.png",
            })
        );
        return { success: true };
    } catch (error) {
        console.error("Error sending push notification:", error);
        return { success: false, error: "Failed to send notification" };
    }
}
