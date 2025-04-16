import Image from "next/image";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            {/* Square Loader with Circular Border */}
            <div className="relative w-32 h-32 flex items-center justify-center rounded-md">
                {/* Rotating Circular Border */}
                <div className="absolute inset-0 w-full h-full border-4 border-transparent border-t-violet-900 border-b-red-900 rounded-full animate-spin"></div>

                {/* Logo inside the Loader */}
                <Image
                    src="/assets/img/ABIC Realty.png"
                    alt="ABIC Realty Logo"
                    width={80}
                    height={80}
                    className="z-10"
                />
            </div>
        </div>
    );
}
