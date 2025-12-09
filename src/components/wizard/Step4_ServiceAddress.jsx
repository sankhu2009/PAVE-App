import React from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { MapPin, Phone, Clock, Accessibility } from 'lucide-react';

const Step4_ServiceAddress = () => {
    const { applicationData, updateData } = useApplication();
    const { serviceAddress } = applicationData;

    const handleChange = (e) => {
        updateData('serviceAddress', { [e.target.name]: e.target.value });
    };

    return (
        <div className="animation-fade-in">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="text-sky-500" /> Service Language & Contact
            </h2>

            <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="input-group">
                    <label>Street Address</label>
                    <input
                        type="text" name="street"
                        placeholder="123 Main St, Suite 100, City, State ZIP"
                        value={serviceAddress.street} onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="input-group">
                    <label>Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="tel" name="phone" className="pl-10"
                            value={serviceAddress.phone} onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label>Hours of Operation</label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text" name="hours" placeholder="e.g. M-F 9am-5pm" className="pl-10"
                            value={serviceAddress.hours} onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="input-group">
                    <label>Pay-To Address (Optional)</label>
                    <input
                        type="text" name="payToAddress"
                        placeholder="If different from Service Address"
                        value={serviceAddress.payToAddress || ''} onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Mailing Address (Optional)</label>
                    <input
                        type="text" name="mailingAddress"
                        placeholder="If different from Service Address"
                        value={serviceAddress.mailingAddress || ''} onChange={handleChange}
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Accessibility className="text-sky-500" /> Accessibility
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="input-group">
                    <label>ADA Compliance</label>
                    <select name="adaCompliant" value={serviceAddress.adaCompliant} onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Is the Location Wheelchair Accessible?</label>
                    <select name="wheelchairAccessible" value={serviceAddress.wheelchairAccessible} onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

        </div>
    );
};

export default Step4_ServiceAddress;
