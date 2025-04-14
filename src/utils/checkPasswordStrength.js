export const passwordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

export const getPasswordStrengthText = (passwordStrengthScore) => {
  if (passwordStrengthScore === 0)
    return {
      text: "no password",
      color: "text-gray-500",
    };
  if (passwordStrengthScore === 1)
    return {
      text: "very weak",
      color: "text-red-600",
    };
  if (passwordStrengthScore === 2)
    return {
      text: "weak",
      color: "text-orange-500",
    };
  if (passwordStrengthScore === 3)
    return {
      text: "medium",
      color: "text-yellow-500",
    };
  if (passwordStrengthScore === 4)
    return {
      text: "strong",
      color: "text-green-400",
    };
  return { text: "very strong", color: "text-green-600" };
};

export const barBackgrounColor = (passwordStrengthScore, index) => {
  if (passwordStrengthScore === 0) return "bg-gray-400";

  if (passwordStrengthScore === 1) {
    return index === 0 ? "bg-red-500" : "bg-gray-400";
  }
  if (passwordStrengthScore === 2) {
    return index === 0 || index === 1 ? "bg-orange-500" : "bg-gray-400";
  }
  if (passwordStrengthScore === 3) {
    return index === 0 || index === 1 || index === 2 ? "bg-yellow-500" : "bg-gray-400";
  }
  if (passwordStrengthScore === 4) {
    return index === 0 || index === 1 || index === 2 || index === 3
      ? "bg-green-500"
      : "bg-gray-400";
  }
  return "bg-green-600";
};
