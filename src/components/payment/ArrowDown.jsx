import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const ArrowDown = ({ targetId }) => {
  const [hasReachedOffer, setHasReachedOffer] = useState(false);

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Create an observer that will set the flag once the target is visible.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasReachedOffer(true);
        }
      },
      { threshold: 0.5 } // Adjust threshold so the arrow disappears when OfferSection is mostly in view.
    );

    observer.observe(targetElement);
    return () => observer.disconnect();
  }, [targetId]);

  if (hasReachedOffer) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <ChevronDown size={48} className="text-gray-600 animate-bounce" />
    </div>
  );
};

export default ArrowDown;
