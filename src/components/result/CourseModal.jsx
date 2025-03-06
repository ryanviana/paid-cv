// /componetes/result/CourseModal.jsx
import CourseDetails from "../../components/CourseDetails";

const CourseModal = ({ selectedCourse, onClose }) => {
  if (!selectedCourse) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm sm:max-w-md md:max-w-xl max-h-full overflow-y-auto">
          <CourseDetails course={selectedCourse} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
