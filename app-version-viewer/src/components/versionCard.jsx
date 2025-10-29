// src/components/VersionCard.jsx
export default function VersionCard({ track, name, build }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-600 capitalize mb-2">{track}</h3>
      <p className="text-gray-700">
        <span className="font-medium">Version Name:</span> {name || '—'}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Build:</span> {build || '—'}
      </p>
    </div>
  );
}
