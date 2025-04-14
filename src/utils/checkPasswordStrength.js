export const passwordStrength = (password) => {
  let score = 0;

  if (password.length >=8 ) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password))  score++
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

export const getPasswordStrengthText = (passwordStrengthScore) => {
    if (passwordStrengthScore === 0) return 'no password';
    if (passwordStrengthScore === 2) return 'weak';
    if (passwordStrengthScore === 3) return 'medium';
    if (passwordStrengthScore === 4) return 'strong';
    return 'very strong'
}

export const getPasswordStrengthColor = (passwordStrengthScore) => {
    if (passwordStrengthScore <= 2) return 'bg-red-500';
    if (passwordStrengthScore === 3) return 'bg-orange-500';
    if (passwordStrengthScore === 4) return 'bg-yellow-500';
    return 'bg-green-600' 
}
