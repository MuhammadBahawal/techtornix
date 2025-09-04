// Image Loader Utility for Techtornix
export const getImagePath = (imagePath) => {
    // Ensure proper path construction for both development and production
    const publicUrl = process.env.PUBLIC_URL || '';

    // Remove leading slash if present to avoid double slashes
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

    return `${publicUrl}/${cleanPath}`;
};

// Preload critical images
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

// Image component with fallback
export const OptimizedImage = ({
    src,
    fallbackSrc,
    alt,
    className = '',
    loading = 'lazy',
    ...props
}) => {
    const [imageSrc, setImageSrc] = useState(getImagePath(src));
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        if (fallbackSrc && imageSrc !== getImagePath(fallbackSrc)) {
            setImageSrc(getImagePath(fallbackSrc));
        }
    };

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            )}
            <img
                src={imageSrc}
                alt={alt}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                {...props}
            />
            {hasError && !fallbackSrc && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                    Image not found
                </div>
            )}
        </div>
    );
};

// Logo paths for different contexts
export const LOGO_PATHS = {
    ICON: 'images/logos/techtornix-iconLogo.png',
    FULL: 'images/logos/techtornixLogo.png',
    FALLBACK: 'images/logos/logo.png'
};

export default {
    getImagePath,
    preloadImage,
    OptimizedImage,
    LOGO_PATHS
};
