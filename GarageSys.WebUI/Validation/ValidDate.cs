using System.ComponentModel.DataAnnotations;

namespace GarageSys.WebUI.Validation
{
    public class ValidDate: ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) =>
    DateTime.TryParseExact(value.ToString(), "DD-MM-yyyy HH:mm", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out _)
        ? ValidationResult.Success
        : new ValidationResult("Invalid date");
    }
}
