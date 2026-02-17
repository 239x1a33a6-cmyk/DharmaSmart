import { useNavigate, useLocation } from 'react-router-dom';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backPath?: string;
    showBreadcrumbs?: boolean;
    actions?: React.ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    backPath,
    showBreadcrumbs = true,
    actions
}: PageHeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ name: 'Home', path: '/' }];

        let currentPath = '';
        paths.forEach((path, _index) => {
            currentPath += `/${path}`;
            const name = path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbs.push({
                name,
                path: currentPath,
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = showBreadcrumbs ? generateBreadcrumbs() : [];

    const handleBack = () => {
        if (backPath) {
            navigate(backPath);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-6 py-4">
                {/* Breadcrumbs */}
                {showBreadcrumbs && breadcrumbs.length > 1 && (
                    <nav className="flex items-center space-x-2 text-sm mb-3">
                        {breadcrumbs.map((crumb, index) => (
                            <div key={crumb.path} className="flex items-center">
                                {index > 0 && (
                                    <i className="ri-arrow-right-s-line text-gray-400 mx-1"></i>
                                )}
                                <button
                                    onClick={() => navigate(crumb.path)}
                                    className={`${index === breadcrumbs.length - 1
                                        ? 'text-teal-600 font-semibold'
                                        : 'text-gray-600 hover:text-teal-600'
                                        } transition-colors cursor-pointer`}
                                >
                                    {crumb.name}
                                </button>
                            </div>
                        ))}
                    </nav>
                )}

                {/* Header Content */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-teal-50 hover:text-teal-600 transition-all group cursor-pointer"
                            title="Go back"
                        >
                            <i className="ri-arrow-left-line text-xl group-hover:scale-110 transition-transform"></i>
                        </button>

                        {/* Title & Subtitle */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            {subtitle && (
                                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    {actions && (
                        <div className="flex items-center space-x-3">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
