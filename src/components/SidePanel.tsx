import { XMarkIcon } from '@heroicons/react/24/outline';

type SidePanelProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function SidePanel({ title, onClose, children }: SidePanelProps) {
  return (
    <div className="flex flex-col p-2">
      <a className="self-end" onClick={onClose}>
        <XMarkIcon className="w-6 h-6" />
      </a>
      <h1 className="font-bold text-xl">{title}</h1>
      <div className="pt-4">{children}</div>
    </div>
  );
}
