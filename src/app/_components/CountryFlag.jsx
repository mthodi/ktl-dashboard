import ReactCountryFlag from "react-country-flag";

/**
 * Country Flag Component
 * Displays a country flag using ISO alpha-2 country code
 *
 * @param {Object} props - Component props
 * @param {string} props.countryCode - ISO alpha-2 country code
 * @param {string} props.size - Size of the flag (default: '1.5em')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element|null} Country flag component
 */
export default function CountryFlag({ countryCode, size = '1.5em', className = '' }) {
  if (!countryCode) return null;

  return (
    <ReactCountryFlag
      countryCode={countryCode.toUpperCase()}
      svg
      style={{
        width: size,
        height: size,
        marginRight: '0.5em'
      }}
      className={className}
      title={countryCode.toUpperCase()}
    />
  );
}
