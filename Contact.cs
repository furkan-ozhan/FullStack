namespace FullStack.API.Models
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email{ get; set; }
        public int Phone { get; set; }
        public string City { get; set; }
    }
}
