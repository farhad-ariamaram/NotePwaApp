using System;
using System.ComponentModel.DataAnnotations;
namespace NotePwaApp.Models
{
    public class Note
    {
        [Key]
        public string Id { get; set; }

        public string Body { get; set; }

        public string Summary { get; set; }

        [MaxLength(100,ErrorMessage = "Maximum length of title is 100 characters")]
        public string Title { get; set; }

        public bool IsDelete { get; set; }
    }
}
