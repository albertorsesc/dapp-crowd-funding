import React from 'react';

const FormField = ({
	label,
	type,
	placeholder,
	isTextArea,
	value,
	handleChange,
}) => {
	return (
		<label className="flex-1 w-full flex flex-col">
			{label && (
				<span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
					{label}
				</span>
			)}

			{isTextArea ? (
				<textarea
					value={value}
					onChange={handleChange}
					required
					placeholder={placeholder}
					className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
					name=""
					id=""
					rows="10"
				></textarea>
			) : (
				<input
					type={type}
					value={value}
					onChange={handleChange}
					step="0.1"
					required
					placeholder={placeholder}
					className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
				/>
			)}
		</label>
	);
};

export default FormField;
