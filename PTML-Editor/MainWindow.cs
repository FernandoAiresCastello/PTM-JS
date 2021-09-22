using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PTML_Editor
{
    public partial class MainWindow : Form
    {
        private static readonly string CompilerPath = "C:/Fernando/Proj/PTM-JS/PTML-Compiler/bin/Debug/ptmc.exe";

        private static readonly string TestDir = "C:/Fernando/Proj/PTM-JS/Test";
        private static readonly string TestSrcFile = Path.Combine(TestDir, "test.ptml");
        private static readonly string TestDstFile = Path.Combine(TestDir, "test.html");

        [DllImport("gdi32.dll")]
        private static extern IntPtr AddFontMemResourceEx(IntPtr pbFont, uint cbFont, IntPtr pdv, [In] ref uint pcFonts);
        private PrivateFontCollection CustomFonts = new PrivateFontCollection();
        private Font CustomFont;

        int TabSize = 4;

        public MainWindow()
        {
            InitializeComponent();
            DoubleBuffered = true;
            KeyPreview = true;
            StartPosition = FormStartPosition.Manual;
            Location = new Point(360, 115);
            Size = new Size(640, 610);
            ToolBar.Visible = false;

            TxtSource.BackColor = Color.FromArgb(0, 0, 80);
            TxtSource.ForeColor = Color.FromArgb(240, 240, 0);

            CustomFont = LoadFontFromFile("../../../Fonts/Px437_IBM_VGA8.ttf");
            TxtSource.Font = CustomFont;
            TxtOutput.Font = CustomFont;

            ClearLog();
            ClearSource();
            OpenFile(TestSrcFile);
        }

        private Font LoadFontFromFile(string filename)
        {
            byte[] resource = File.ReadAllBytes(filename);
            IntPtr fontPtr = Marshal.AllocCoTaskMem(resource.Length);
            Marshal.Copy(resource, 0, fontPtr, resource.Length);
            uint dummy = 0;
            CustomFonts.AddMemoryFont(fontPtr, resource.Length);
            AddFontMemResourceEx(fontPtr, (uint)resource.Length, IntPtr.Zero, ref dummy);
            Marshal.FreeCoTaskMem(fontPtr);
            return new Font(CustomFonts.Families[CustomFonts.Families.Length - 1], 12.0f);
        }

        private void SetFontSize(float size)
        {
            TxtSource.Font = new Font(TxtSource.Font.FontFamily, size);
            //TxtOutput.Font = new Font(TxtOutput.Font.FontFamily, size);
        }

        private void MainWindow_Resize(object sender, EventArgs e)
        {
            Text = string.Format("{0} x {1} @ {2} , {3}", 
                Size.Width, Size.Height, Location.X, Location.Y);
        }

        private void MiFileOpen_Click(object sender, EventArgs e)
        {
            OpenFile();
        }

        private void MiFileSave_Click(object sender, EventArgs e)
        {
            SaveFile();
        }

        private void MiProgCompile_Click(object sender, EventArgs e)
        {
            SaveAndCompile();
        }

        private void MiProgCompileRun_Click(object sender, EventArgs e)
        {
            // todo
        }

        private void MiProgRun_Click(object sender, EventArgs e)
        {
            Run();
        }

        private void TxtSource_KeyDown(object sender, KeyEventArgs e)
        {
            e.Handled = true;
            e.SuppressKeyPress = true;

            if (e.KeyCode == Keys.Return && e.Modifiers == Keys.Control)
            {
                SaveAndCompile();
            }
            else if (e.KeyCode == Keys.Tab)
            {
                SendKeys.Send(new string(' ', TabSize));
            }
            else if (e.KeyCode == Keys.Oemplus && e.Modifiers == Keys.Control)
            {
                if (TxtSource.Font.Size < 100)
                    SetFontSize(TxtSource.Font.Size + 1);
            }
            else if (e.KeyCode == Keys.OemMinus && e.Modifiers == Keys.Control)
            {
                if (TxtSource.Font.Size > 1)
                    SetFontSize(TxtSource.Font.Size - 1);
            }
            else
            {
                e.Handled = false;
                e.SuppressKeyPress = false;
            }
        }

        private void OpenFile()
        {
            OpenFileDialog dialog = new OpenFileDialog();
            if (dialog.ShowDialog(this) == DialogResult.OK)
                OpenFile(dialog.FileName);
        }

        private void OpenFile(string file)
        {
            TxtSource.Text = File.ReadAllText(file);
            TxtSource.SelectionStart = 0;
            TxtSource.SelectionLength = 0;
            Log("File read from " + file);
        }

        private void SaveFile()
        {
            /*
            SaveFileDialog dialog = new SaveFileDialog();
            if (dialog.ShowDialog(this) == DialogResult.OK)
                SaveFile(dialog.FileName);*/
            SaveFile(TestSrcFile);
        }

        private void SaveFile(string file)
        {
            File.WriteAllText(file, TxtSource.Text);
            Log("File saved to " + file);
        }

        private void SaveAndCompile()
        {
            SaveFile(TestSrcFile);
            Compile();
        }

        private bool Compile()
        {
            ProcessStartInfo psi = new ProcessStartInfo(CompilerPath, TestSrcFile + " " + TestDstFile);
            psi.CreateNoWindow = true;
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;

            Process proc = Process.Start(psi);
            proc.WaitForExit();

            string output = proc.StandardOutput.ReadToEnd();
            Log(output);

            return proc.ExitCode == 0;
        }

        private void Run()
        {
            Process.Start(TestDstFile);
        }

        private void ClearLog()
        {
            TxtOutput.Text = "";
        }

        private void ClearSource()
        {
            TxtSource.Clear();
        }

        private void Log(string text)
        {
            TxtOutput.AppendText(text + Environment.NewLine);
        }

        private void MiOpenGenerated_Click(object sender, EventArgs e)
        {
            Process.Start("notepad", TestDstFile);
        }

        private void MiClearLog_Click(object sender, EventArgs e)
        {
            ClearLog();
        }

        private void MiExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void MiFileNew_Click(object sender, EventArgs e)
        {
            Log("New file");
            ClearSource();
        }
    }
}
