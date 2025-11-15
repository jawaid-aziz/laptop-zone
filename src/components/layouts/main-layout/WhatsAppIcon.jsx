import Image from "next/image";
import Link from "next/link";

export const WhatsAppIcon = () => {
    const number = "923001117320";
    return(
        <div className="fixed bottom-5 right-5 flex items-center justify-center w-14 h-14 cursor-pointer">
            <Link
                href={`https://wa.me/${number}`}
                target="_blank"
                rel="noopener noreferrer"
            >
            <Image src="/whatsApp.svg" width={40} height={40} alt='WhatsApp' />
            </Link>
        </div>
    )
}