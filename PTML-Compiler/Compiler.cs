using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;

namespace PTMLCompiler
{
    class Compiler
    {
        private const string OutputFilePlaceholder = "[[[COMPILED_JS]]]";
        private const string FunctionBodyStart = "{";
        private const string FunctionBodyEnd = "}";

        private string[] RawSrcLines;
        private string BaseJs;
        private string BaseHtml;
        private List<SourceLine> Source;
        private List<string> Output;
        private SourceLine CurLine;

        public Compiler(string[] srcLines, string baseJs, string baseHtml)
        {
            RawSrcLines = srcLines;
            BaseJs = baseJs;
            BaseHtml = baseHtml;
            Source = new List<SourceLine>();
            Output = new List<string>();
        }

        public string Run()
        {
            Source = new Preprocessor(RawSrcLines).Run();

            for (int i = 0; i < Source.Count; i++)
            {
                CurLine = Source[i];

                int indexOfFirstSpace = CurLine.Code.IndexOf(' ');
                string cmd;
                string[] param;

                if (indexOfFirstSpace > 0)
                {
                    cmd = CurLine.Code.Substring(0, indexOfFirstSpace).Trim();

                    if (CurLine.Code.Contains("\""))
                    {
                        param = new string[]
                        {
                            CurLine.Code.Substring(indexOfFirstSpace).Trim().Replace("\"", "")
                        };
                    }
                    else
                    {
                        param = CurLine.Code.Substring(indexOfFirstSpace).Trim().Split(' ');
                    }
                }
                else
                {
                    cmd = CurLine.Code;
                    param = new string[0];
                }

                if (cmd.EndsWith(":"))
                {
                    Output.Add(string.Format("\tprg.AddLabel('{0}', prg.Lines.length);", 
                        cmd.Substring(0, cmd.Length - 1)));
                }
                else
                {
                    for (int pi = 0; pi < param.Length; pi++)
                        param[pi] = string.Format("'{0}'", param[pi]);

                    string paramList = string.Join(", ", param);

                    Output.Add(string.Format("\tprg.AddLine({0}, '{1}', [{2}]);",
                        CurLine.LineNr, cmd, paramList));
                }
            }

            string compiledCode = string.Join(Environment.NewLine, Output.ToArray());
            string outputJs = InjectCompiledJsIntoBaseJs(compiledCode);
            string outputHtml = InjectOutputJsIntoBaseHtml(outputJs);

            return outputHtml;
        }
        
        private string InjectCompiledJsIntoBaseJs(string js)
        {
            return BaseJs.Replace(OutputFilePlaceholder, js);
        }

        private string InjectOutputJsIntoBaseHtml(string js)
        {
            return BaseHtml.Replace(OutputFilePlaceholder, js);
        }

        private void AssertParamCount(string[] param, int count)
        {
            if (param == null)
                param = new string[0];

            if (param.Length != count)
                throw new CompilerException(string.Format(
                    "Expected {0} args, got {1}", count, param.Length), CurLine);
        }

        private int ParseChar(string str)
        {
            int ch = 0;

            if (str.StartsWith("'") && str.EndsWith("'"))
            {
                str = str.Substring(1, str.Length - 2);
                ch = str[0];
            }
            else
            {
                ch = ParseNumber(str);
            }

            return ch;
        }

        private int ParseNumber(string str)
        {
            int number = 0;

            if (str.StartsWith("0x"))
                number = Convert.ToInt32(str.Substring(2), 16);
            else if (str.StartsWith("0b"))
                number = Convert.ToInt32(str.Substring(2), 2);
            else
                number = Convert.ToInt32(str, 10);

            return number;
        }

        private string ParseRGB(string sr, string sg, string sb)
        {
            int r = ParseNumber(sr);
            int g = ParseNumber(sg);
            int b = ParseNumber(sb);
            return string.Format("0x{0}{1}{2}", r.ToString("x2"), g.ToString("x2"), b.ToString("x2"));
        }
    }
}
