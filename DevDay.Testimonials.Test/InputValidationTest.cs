using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DevDay.Testimonials.Test
{
    [TestClass]
    public class InputValidationTest
    {
        [TestMethod]
        public void AlphaNumericTest()
        {
            const string input = "123456abcdef";
            Assert.AreEqual(input, input.Sanitize());
        }        
        
        [TestMethod]
        public void WhiteSpacesTest()
        {
            const string input = "I am the walrus";
            Assert.AreEqual(input, input.Sanitize());
        }        
        
        [TestMethod]
        public void SmileysTest()
        {
            const string input = "I am the walrus :)";
            Assert.AreEqual(input, input.Sanitize());
        }
    }
}
