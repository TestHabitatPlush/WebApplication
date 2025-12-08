import React from "react";

const DashboardCard = ({ title, icon, rightItem, count, description, subItems = [] }) => {
  return (
    <div className="p-4 transition-shadow duration-300 bg-white rounded-lg shadow hover:shadow-lg">
      <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">{title}</h2>

      <div className="flex items-center justify-between">
        {/* Left side */}
        <div>
          <div className="flex items-center space-x-3">
            {icon && <div className="text-2xl text-gray-700">{icon}</div>}
            <div>
              <h3 className="text-xl font-semibold text-green-700">{count}</h3>
              {description && <p className="text-gray-500">{description}</p>}
            </div>
          </div>

          {subItems.length > 0 && (
            <div className="mt-2 space-y-1">
              {subItems.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  {item.icon && <div className="text-xl">{item.icon}</div>}
                  <a
                    href={`${process.env.REACT_APP_PUBLIC_BASE_URL}${item.link || ""}`}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    {item.value} {item.label}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        {rightItem && (
          <div className="flex items-center space-x-2">
            {rightItem.icon && <div className="text-xl">{rightItem.icon}</div>}
            <div className="flex flex-col">
              <p className="text-lg font-bold">{rightItem.value}</p>
              <p className="text-sm text-gray-500">{rightItem.label}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
