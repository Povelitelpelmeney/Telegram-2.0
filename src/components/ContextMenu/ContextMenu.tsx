import React, {
  useState,
  useEffect,
  useRef,
  Children,
  ReactNode,
  CSSProperties,
} from "react";

type ContextMenuType = {
  isOpen: boolean;
  setOpen: () => void;
  children: ReactNode;
  className: String;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

const ContextMenu = ({
  isOpen,
  setOpen,
  children,
  className,
  triggerRef,
}: ContextMenuType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsRendered(false), 300);
    }
  }, [isOpen]);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !(triggerRef.current && triggerRef.current.contains(event.target as Node))
    ) {
      setOpen();
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const isMouseOutside =
        event.clientX < rect.left - 100 ||
        event.clientX > rect.right + 100 ||
        event.clientY < rect.top - 100 ||
        event.clientY > rect.bottom + 100;

      if (isMouseOutside) {
        setOpen();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isOpen]);

  if (!isRendered) return null;
  return (
    <div
      ref={modalRef}
      className={`${className} rounded-lg  transition-opacity  ${
        isVisible ? "opacity-100" : "opacity-0"
      } duration-500 ease-in-out dark:rounded-md`}
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ContextMenu;
