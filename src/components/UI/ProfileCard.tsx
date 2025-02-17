import Image from "next/image";

interface ProfileCardProps {
  username: string;
  imageUrl: string;
}

export default function ProfileCard({ username, imageUrl }: ProfileCardProps) {
  console.log(username, imageUrl);
  return (
    <div className="flex items-center gap-3 bg-sand-100 rounded-full px-4 py-2 shadow-sm">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${username}'s profile`}
          fill
          className="object-cover"
        />
      </div>
      <span className="text-sand-800 font-medium">{username}</span>
    </div>
  );
}
