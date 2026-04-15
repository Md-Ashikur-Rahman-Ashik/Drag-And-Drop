export default function Input({
  label,
  value,
  onChange,
  onKeyDown,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className="bg-gray-800 text-white text-sm px-3 py-2 rounded border border-transparent focus:border-blue-500 outline-none placeholder-gray-600 transition-colors duration-150"
      />
    </div>
  );
}
