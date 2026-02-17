import { useState } from 'react';

interface SupplyAllocationModalProps {
  language: 'en' | 'hi';
  onClose: () => void;
}

export default function SupplyAllocationModal({ language, onClose }: SupplyAllocationModalProps) {
  const [formData, setFormData] = useState({
    supplyItem: 'ORS Packets',
    quantity: '',
    destination: '',
    recipient: '',
    urgency: 'medium',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supply allocation handled
    onClose();
  };

  const content = {
    en: {
      title: 'Allocate Medical Supplies',
      supplyItem: 'Supply Item',
      quantity: 'Quantity',
      destination: 'Destination',
      recipient: 'Recipient Name',
      urgency: 'Urgency Level',
      notes: 'Additional Notes',
      cancel: 'Cancel',
      allocate: 'Allocate Supplies',
      urgencyLevels: {
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      }
    },
    hi: {
      title: 'चिकित्सा आपूर्ति आवंटित करें',
      supplyItem: 'आपूर्ति वस्तु',
      quantity: 'मात्रा',
      destination: 'गंतव्य',
      recipient: 'प्राप्तकर्ता का नाम',
      urgency: 'तात्कालिकता स्तर',
      notes: 'अतिरिक्त नोट्स',
      cancel: 'रद्द करें',
      allocate: 'आपूर्ति आवंटित करें',
      urgencyLevels: {
        critical: 'गंभीर',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'निम्न'
      }
    }
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-navy">{t.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.supplyItem} *
            </label>
            <select
              required
              value={formData.supplyItem}
              onChange={(e) => setFormData({ ...formData, supplyItem: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
            >
              <option value="ORS Packets">ORS Packets</option>
              <option value="Antibiotics (Ciprofloxacin)">Antibiotics (Ciprofloxacin)</option>
              <option value="IV Fluids (Ringer Lactate)">IV Fluids (Ringer Lactate)</option>
              <option value="Chlorine Tablets">Chlorine Tablets</option>
              <option value="Zinc Supplements">Zinc Supplements</option>
              <option value="Rapid Diagnostic Kits">Rapid Diagnostic Kits</option>
              <option value="PPE Kits">PPE Kits</option>
              <option value="Water Testing Kits">Water Testing Kits</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.quantity} *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.urgency} *
              </label>
              <select
                required
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
              >
                <option value="critical">{t.urgencyLevels.critical}</option>
                <option value="high">{t.urgencyLevels.high}</option>
                <option value="medium">{t.urgencyLevels.medium}</option>
                <option value="low">{t.urgencyLevels.low}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.destination} *
            </label>
            <input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter destination location"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.recipient} *
            </label>
            <input
              type="text"
              required
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter recipient name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.notes}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter any additional notes"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all cursor-pointer whitespace-nowrap"
            >
              {t.allocate}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
