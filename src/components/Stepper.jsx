import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ steps, currentStep }) => {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-sky-500 -z-10 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const stepNum = index + 1;
                    const isCompleted = stepNum < currentStep;
                    const isCurrent = stepNum === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    ${isCompleted ? 'bg-sky-500 border-sky-500 text-white' :
                                        isCurrent ? 'bg-white border-sky-500 text-sky-500 shadow-lg scale-110' :
                                            'bg-white border-slate-300 text-slate-400'}
                                `}
                            >
                                {isCompleted ? <Check className="w-6 h-6" /> : <span className="font-bold">{stepNum}</span>}
                            </div>
                            <span className={`text-xs font-medium ${isCurrent ? 'text-sky-600' : 'text-slate-500'} hidden md:block max-w-[80px] text-center`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
