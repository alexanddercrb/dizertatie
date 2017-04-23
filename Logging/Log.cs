using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Logging
{
    public class Log
    {

        private static void writeToFile (string text)
        {
            string path = @"c:\storeLogs\logs.txt";

            while (true) //repeat until is able to write to file - in case the file is already opened.
            {
                try
                {
                    if (!File.Exists(path))
                    {
                        using (StreamWriter sw = File.CreateText(path))
                        {
                            sw.WriteLine(text);
                            sw.WriteLine(" ");
                            sw.Close();
                        }
                    }
                    else
                    {
                        using (StreamWriter sw = File.AppendText(path))
                        {
                            sw.WriteLine(text);
                            sw.WriteLine(" ");
                            sw.Close();
                        }
                    }
                    break;
                }
                catch
                {
                    Thread.Sleep(1000);
                }
            }
        }

        public static void error(string location, DateTime date, Exception ex)
        {
            string innerException;
            if (ex.InnerException == null)
                innerException = "none";
            else
                innerException = ex.InnerException.ToString();
            string text = "Error: " + date.ToString() + " - Location: " + location + " \r\n Message: " + ex.Message + " \r\n Inner Exception: " + innerException + " \r\n Stack Trace: " + ex.StackTrace + " \r\n -------------------------------------------------------------------------------------------------------------";

            Task.Factory.StartNew(() => writeToFile(text));
        }

        public static void warning(string location, DateTime date, string message)
        {
            string text = "Warning: " + date.ToString() + " - Location:" + location + " \r\n Message: " + message + " \r\n -------------------------------------------------------------------------------------------------------------";
            Task.Factory.StartNew(() => writeToFile(text));
        }

        public static void info(string location, DateTime date, string message)
        {
            string text = "Error: " + date.ToString() + " - Location:" + location + " \r\n Message: " + message + " \r\n -------------------------------------------------------------------------------------------------------------";
            Task.Factory.StartNew(() => writeToFile(text));
        }
    }
}
