import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, FileText, Eye } from "lucide-react";
import MarkdownPreview from '@/components/MarkdownPreview';
import { cn } from '@/lib/utils';

const Index = () => {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    // Process text replacements

    let processed = input
      .replace(/\\\[/g, '$$$$')
      .replace(/\\\]/g, '$$$$') 
      .replace(/\\\(/g, '${')
      .replace(/\\\)/g, '}$');

    
    setPreview(processed);
  }, [input]);  

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(preview);
      toast.success("Markdown copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Markify
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Convert your text with beautiful markdown formatting
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">Input</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="lg:hidden"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreviewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
            <Textarea
              placeholder="Enter your markdown text here..."
              className={cn(
                "min-h-[500px] font-mono resize-none",
                isPreviewMode && "hidden lg:block"
              )}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Card>

          <Card className={cn(
            "p-4 shadow-lg",
            !isPreviewMode && "hidden lg:block"
          )}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <h2 className="font-semibold">Preview</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="min-h-[500px] prose dark:prose-invert max-w-none">
              <MarkdownPreview content={preview} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;