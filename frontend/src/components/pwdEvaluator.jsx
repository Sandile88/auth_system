import { Check, X } from "lucide-react";

const PwdCriteria = ({ password }) => {
    const criteria = [
        { label : "At least 8 characters", met: password.length >= 8 },
        { label : "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label : "Contains lowercase letter", met: /[a-z]/.test(password) },
        { label : "Contains a number", met: /\d/.test(password)},
        { label : "COntains special character", met: /[^A-Za-z0-9]/test(password)},
    ];

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.met ? (
                        <Check className="size-4 text-green-500 mr-2"/>
                    ) : (
                        <X className="size-4 text-gray-500 mr-2"/>
                    )}
                    <span className={item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

const PwdEvaluator =({ password }) => {
    const getStrength = ( pwd ) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
		if (pass.match(/\d/)) strength++;
		if (pass.match(/[^a-zA-Z\d]/)) strength++;    
        return strength;
    };
    const strength = getStrength(password);

    const getColour = ( strength ) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";
    };
}