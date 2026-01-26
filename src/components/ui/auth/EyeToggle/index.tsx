import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface EyeToggleProps {
    isVisible: boolean;
    onToggle: () => void;
}

export default function EyeToggle({ isVisible, onToggle }: EyeToggleProps) {

    return (
        <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} onClick={onToggle} className="absolute top-[36px] right-[4%] text-black cursor-pointer" />
    )
}