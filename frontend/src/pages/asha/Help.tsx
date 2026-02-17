import AshaLayout from '../../components/layout/AshaLayout';

export default function Help() {
    return (
        <AshaLayout title="Help & Training" showBack backPath="/asha/dashboard">
            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center py-16">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="ri-question-answer-line text-4xl text-blue-500"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-navy mb-2">Help Center</h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                        Access training modules, user manuals, and contact support for the ASHA surveillance application.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
                        <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-navy text-sm flex items-center justify-center">
                            <i className="ri-book-open-line mr-2 text-primary"></i>
                            User Manual
                        </button>
                        <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-navy text-sm flex items-center justify-center">
                            <i className="ri-video-line mr-2 text-primary"></i>
                            Video Tutorials
                        </button>
                        <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-navy text-sm flex items-center justify-center">
                            <i className="ri-phone-line mr-2 text-primary"></i>
                            Contact Support
                        </button>
                        <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-navy text-sm flex items-center justify-center">
                            <i className="ri-file-list-3-line mr-2 text-primary"></i>
                            FAQs
                        </button>
                    </div>
                </div>
            </div>
        </AshaLayout>
    );
}
