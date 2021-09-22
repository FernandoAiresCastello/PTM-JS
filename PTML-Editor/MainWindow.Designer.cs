﻿namespace PTML_Editor
{
    partial class MainWindow
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainWindow));
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.MiFileNew = new System.Windows.Forms.ToolStripMenuItem();
            this.MiFileOpen = new System.Windows.Forms.ToolStripMenuItem();
            this.MiFileSave = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.MiExit = new System.Windows.Forms.ToolStripMenuItem();
            this.buildRunToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.MiProgCompile = new System.Windows.Forms.ToolStripMenuItem();
            this.MiProgRun = new System.Windows.Forms.ToolStripMenuItem();
            this.optionsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.helpToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.MiAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.panel1 = new System.Windows.Forms.Panel();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.TxtOutput = new System.Windows.Forms.TextBox();
            this.ToolBar = new System.Windows.Forms.ToolStrip();
            this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.MiOpenGenerated = new System.Windows.Forms.ToolStripMenuItem();
            this.MiClearLog = new System.Windows.Forms.ToolStripMenuItem();
            this.SrcPanel = new System.Windows.Forms.Panel();
            this.TxtSource = new System.Windows.Forms.TextBox();
            this.menuStrip1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.tableLayoutPanel1.SuspendLayout();
            this.SrcPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.buildRunToolStripMenuItem,
            this.optionsToolStripMenuItem,
            this.helpToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(624, 24);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.MiFileNew,
            this.MiFileOpen,
            this.MiFileSave,
            this.toolStripSeparator1,
            this.MiExit});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // MiFileNew
            // 
            this.MiFileNew.Name = "MiFileNew";
            this.MiFileNew.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.N)));
            this.MiFileNew.Size = new System.Drawing.Size(180, 22);
            this.MiFileNew.Text = "New";
            this.MiFileNew.Click += new System.EventHandler(this.MiFileNew_Click);
            // 
            // MiFileOpen
            // 
            this.MiFileOpen.Name = "MiFileOpen";
            this.MiFileOpen.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.O)));
            this.MiFileOpen.Size = new System.Drawing.Size(180, 22);
            this.MiFileOpen.Text = "Open";
            this.MiFileOpen.Click += new System.EventHandler(this.MiFileOpen_Click);
            // 
            // MiFileSave
            // 
            this.MiFileSave.Name = "MiFileSave";
            this.MiFileSave.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.S)));
            this.MiFileSave.Size = new System.Drawing.Size(180, 22);
            this.MiFileSave.Text = "Save";
            this.MiFileSave.Click += new System.EventHandler(this.MiFileSave_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(177, 6);
            // 
            // MiExit
            // 
            this.MiExit.Name = "MiExit";
            this.MiExit.Size = new System.Drawing.Size(180, 22);
            this.MiExit.Text = "Exit";
            this.MiExit.Click += new System.EventHandler(this.MiExit_Click);
            // 
            // buildRunToolStripMenuItem
            // 
            this.buildRunToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.MiProgCompile,
            this.MiProgRun,
            this.toolStripSeparator2,
            this.MiOpenGenerated});
            this.buildRunToolStripMenuItem.Name = "buildRunToolStripMenuItem";
            this.buildRunToolStripMenuItem.Size = new System.Drawing.Size(65, 20);
            this.buildRunToolStripMenuItem.Text = "Program";
            // 
            // MiProgCompile
            // 
            this.MiProgCompile.Name = "MiProgCompile";
            this.MiProgCompile.Size = new System.Drawing.Size(189, 22);
            this.MiProgCompile.Text = "Compile";
            this.MiProgCompile.Click += new System.EventHandler(this.MiProgCompile_Click);
            // 
            // MiProgRun
            // 
            this.MiProgRun.Name = "MiProgRun";
            this.MiProgRun.Size = new System.Drawing.Size(189, 22);
            this.MiProgRun.Text = "Run";
            this.MiProgRun.Click += new System.EventHandler(this.MiProgRun_Click);
            // 
            // optionsToolStripMenuItem
            // 
            this.optionsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.MiClearLog});
            this.optionsToolStripMenuItem.Name = "optionsToolStripMenuItem";
            this.optionsToolStripMenuItem.Size = new System.Drawing.Size(61, 20);
            this.optionsToolStripMenuItem.Text = "Options";
            // 
            // helpToolStripMenuItem
            // 
            this.helpToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.MiAbout});
            this.helpToolStripMenuItem.Name = "helpToolStripMenuItem";
            this.helpToolStripMenuItem.Size = new System.Drawing.Size(44, 20);
            this.helpToolStripMenuItem.Text = "Help";
            // 
            // MiAbout
            // 
            this.MiAbout.Name = "MiAbout";
            this.MiAbout.Size = new System.Drawing.Size(107, 22);
            this.MiAbout.Text = "About";
            // 
            // statusStrip1
            // 
            this.statusStrip1.Location = new System.Drawing.Point(0, 420);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Size = new System.Drawing.Size(624, 22);
            this.statusStrip1.TabIndex = 1;
            this.statusStrip1.Text = "s";
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.tableLayoutPanel1);
            this.panel1.Controls.Add(this.ToolBar);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 24);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(624, 396);
            this.panel1.TabIndex = 2;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 3;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 1F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 98F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 1F));
            this.tableLayoutPanel1.Controls.Add(this.TxtOutput, 1, 1);
            this.tableLayoutPanel1.Controls.Add(this.SrcPanel, 1, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 25);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 80F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(624, 371);
            this.tableLayoutPanel1.TabIndex = 3;
            // 
            // TxtOutput
            // 
            this.TxtOutput.BackColor = System.Drawing.SystemColors.Control;
            this.TxtOutput.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TxtOutput.Font = new System.Drawing.Font("Consolas", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.TxtOutput.ForeColor = System.Drawing.Color.Gray;
            this.TxtOutput.Location = new System.Drawing.Point(9, 299);
            this.TxtOutput.Multiline = true;
            this.TxtOutput.Name = "TxtOutput";
            this.TxtOutput.ReadOnly = true;
            this.TxtOutput.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.TxtOutput.Size = new System.Drawing.Size(605, 69);
            this.TxtOutput.TabIndex = 1;
            this.TxtOutput.TabStop = false;
            this.TxtOutput.Text = "Log";
            this.TxtOutput.WordWrap = false;
            // 
            // ToolBar
            // 
            this.ToolBar.Location = new System.Drawing.Point(0, 0);
            this.ToolBar.Name = "ToolBar";
            this.ToolBar.Size = new System.Drawing.Size(624, 25);
            this.ToolBar.TabIndex = 0;
            this.ToolBar.Text = "toolStrip1";
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = new System.Drawing.Size(186, 6);
            // 
            // MiOpenGenerated
            // 
            this.MiOpenGenerated.Name = "MiOpenGenerated";
            this.MiOpenGenerated.Size = new System.Drawing.Size(189, 22);
            this.MiOpenGenerated.Text = "View last generated JS";
            this.MiOpenGenerated.Click += new System.EventHandler(this.MiOpenGenerated_Click);
            // 
            // MiClearLog
            // 
            this.MiClearLog.Name = "MiClearLog";
            this.MiClearLog.Size = new System.Drawing.Size(180, 22);
            this.MiClearLog.Text = "Clear log";
            this.MiClearLog.Click += new System.EventHandler(this.MiClearLog_Click);
            // 
            // SrcPanel
            // 
            this.SrcPanel.Controls.Add(this.TxtSource);
            this.SrcPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.SrcPanel.Location = new System.Drawing.Point(9, 3);
            this.SrcPanel.Name = "SrcPanel";
            this.SrcPanel.Padding = new System.Windows.Forms.Padding(15);
            this.SrcPanel.Size = new System.Drawing.Size(605, 290);
            this.SrcPanel.TabIndex = 2;
            // 
            // TxtSource
            // 
            this.TxtSource.AcceptsReturn = true;
            this.TxtSource.AcceptsTab = true;
            this.TxtSource.BackColor = System.Drawing.Color.White;
            this.TxtSource.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.TxtSource.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TxtSource.Font = new System.Drawing.Font("Input", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.TxtSource.ForeColor = System.Drawing.Color.Black;
            this.TxtSource.Location = new System.Drawing.Point(15, 15);
            this.TxtSource.Multiline = true;
            this.TxtSource.Name = "TxtSource";
            this.TxtSource.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.TxtSource.Size = new System.Drawing.Size(575, 260);
            this.TxtSource.TabIndex = 1;
            this.TxtSource.Text = "Source code";
            this.TxtSource.WordWrap = false;
            this.TxtSource.KeyDown += new System.Windows.Forms.KeyEventHandler(this.TxtSource_KeyDown);
            // 
            // MainWindow
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(624, 442);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.statusStrip1);
            this.Controls.Add(this.menuStrip1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "MainWindow";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "PTML Editor";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel1.PerformLayout();
            this.SrcPanel.ResumeLayout(false);
            this.SrcPanel.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.StatusStrip statusStrip1;
        private System.Windows.Forms.ToolStripMenuItem MiFileNew;
        private System.Windows.Forms.ToolStripMenuItem MiFileOpen;
        private System.Windows.Forms.ToolStripMenuItem MiFileSave;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        private System.Windows.Forms.ToolStripMenuItem MiExit;
        private System.Windows.Forms.ToolStripMenuItem buildRunToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem MiProgCompile;
        private System.Windows.Forms.ToolStripMenuItem MiProgRun;
        private System.Windows.Forms.ToolStripMenuItem helpToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem MiAbout;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.TextBox TxtOutput;
        private System.Windows.Forms.ToolStrip ToolBar;
        private System.Windows.Forms.ToolStripMenuItem optionsToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripSeparator2;
        private System.Windows.Forms.ToolStripMenuItem MiOpenGenerated;
        private System.Windows.Forms.ToolStripMenuItem MiClearLog;
        private System.Windows.Forms.Panel SrcPanel;
        private System.Windows.Forms.TextBox TxtSource;
    }
}

