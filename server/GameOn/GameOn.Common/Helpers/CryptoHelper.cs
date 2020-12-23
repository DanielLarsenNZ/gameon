using System.Security.Cryptography;
using System.Text;

namespace GameOn.Common.Helpers
{
    public class CryptoHelper
    {
        public static string Sha256(string input)
        {
            using (var algorithm = SHA256.Create())
            {
                return GetStringFromHash(algorithm.ComputeHash(Encoding.UTF8.GetBytes(input)));
            }
        }

        //TODO: Surely there is a better way than this?
        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
    }
}
