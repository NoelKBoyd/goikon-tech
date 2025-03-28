import Spline from "@splinetool/react-spline";

export default function SplineButton({ onClick, isValid }) {
  const handleClick = (e) => {
    console.log("Button clicked. isValid:", isValid); // 🔍 Debugging check
  
    if (!isValid) {
      e.preventDefault(); // Stop the event from propagating
      e.stopPropagation(); // Stop any potential bubbling up
      console.log("Click prevented due to invalid form"); // 🔍 Debugging check
      return;
    }
  
    onClick && onClick(e);
  };
  

  return (
    <div
      className={`w-full flex justify-center items-center overflow-hidden relative 
                  ${isValid ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div className="w-[500px] h-[220px] flex justify-center items-end">
        <Spline
          scene="https://prod.spline.design/JEWQHUHXRKG5Fq9p/scene.splinecode"
          onMouseDown={handleClick}
          style={{
            transform: "scale(0.8) translateY(84px)",
            opacity: isValid ? "1" : "0.5",
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
