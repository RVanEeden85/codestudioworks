const ServiceHomeBlock = () => {
    return (
        <a
            href={link}
            className="w-full h-full flex flex-col items-center justify-center bg-gray-100"
        >
            <div className="text-center">
                <h2>{serviceHeading}</h2>
                <p>{serviceDescription}</p>
            </div>
        </a>
    );
};

export default ServiceHomeBlock;
