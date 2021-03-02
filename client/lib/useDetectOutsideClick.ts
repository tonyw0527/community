import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useDetectOutsideClick = (el: any, initialState: boolean): [boolean, Dispatch<SetStateAction<boolean>>] => {

  const [isActive, setIsActive] = useState<boolean>(initialState);
  
  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (
        el.current !== null &&
        !el.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
}

