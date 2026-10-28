import React, { useRef, useState, useEffect } from 'react';
import { ColoringPage } from '../types';
import { 
  X, 
  Download, 
  RotateCcw, 
  Printer, 
  Palette, 
  Eraser, 
  Sparkles, 
  Undo2,
  Check
} from 'lucide-react';

interface ColoringCanvasModalProps {
  coloringPage: ColoringPage;
  onClose: () => void;
}

export const ColoringCanvasModal: React.FC<ColoringCanvasModalProps> = ({
  coloringPage,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState('#E11D48'); // Rose
  const [brushSize, setBrushSize] = useState(14);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const colors = [
    '#E11D48', // Đỏ hồng
    '#EA580C', // Cam rực
    '#F59E0B', // Vàng ấm
    '#84CC16', // Xanh nõn chuối
    '#10B981', // Xanh ngọc
    '#06B6D4', // Xanh da trời
    '#3B82F6', // Xanh dương
    '#8B5CF6', // Tím mộng mơ
    '#EC4899', // Hồng kẹo ngọt
    '#78350F', // Nâu hạt dẻ
    '#1F2937', // Đen than
    '#9CA3AF', // Xám
  ];

  // Initialize canvas and draw SVG as base outline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI canvas resolution
    canvas.width = 800;
    canvas.height = 800;

    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render SVG into image and draw onto canvas
    const img = new Image();
    const svgBlob = new Blob([coloringPage.svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      // Save initial snapshot to history
      const initialSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialSnapshot]);
    };
    img.src = url;
  }, [coloringPage]);

  // Handle drawing coordinates
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save history before drawing stroke
    const currentSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), currentSnapshot]);

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : selectedColor;
    ctx.lineWidth = brushSize;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.closePath();
    }
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = history[history.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Re-draw base SVG
    const img = new Image();
    const svgBlob = new Blob([coloringPage.svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Tranh-to-mau-${coloringPage.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 no-print">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-amber-200 flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-900 leading-tight">
                {coloringPage.title}
              </h3>
              <p className="text-xs text-neutral-500">
                Góc bé tự sáng tạo màu sắc trực tiếp trên web
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Studio Canvas Body */}
        <div className="p-4 sm:p-6 bg-amber-50/40 flex-1 overflow-y-auto flex flex-col items-center justify-center gap-4">
          {/* Main Drawing Canvas */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200/90 overflow-hidden w-full max-w-[540px] aspect-square touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair select-none"
            />
          </div>

          {/* Color Palette Selector */}
          <div className="w-full max-w-xl bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
                Bảng màu tươi sáng:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEraser(false)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                    !isEraser ? 'bg-amber-500 text-neutral-900' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Bút vẽ</span>
                </button>
                <button
                  onClick={() => setIsEraser(true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                    isEraser ? 'bg-amber-500 text-neutral-900' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Cục tẩy</span>
                </button>
              </div>
            </div>

            {/* Colors Swatches */}
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform shadow-xs flex items-center justify-center ${
                    selectedColor === c && !isEraser ? 'scale-125 border-neutral-900' : 'border-white hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Màu ${c}`}
                >
                  {selectedColor === c && !isEraser && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />
                  )}
                </button>
              ))}
            </div>

            {/* Brush sizes and controls */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-semibold">Cỡ nét:</span>
                {[8, 14, 22].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setBrushSize(sz)}
                    className={`px-2.5 py-1 rounded-lg font-bold ${
                      brushSize === sz ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {sz === 8 ? 'Mảnh' : sz === 14 ? 'Vừa' : 'Đậm'}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleUndo}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center gap-1"
                  title="Hoàn tác nét vẽ"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Lùi lại</span>
                </button>
                <button
                  onClick={handleClear}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold flex items-center gap-1"
                  title="Vẽ lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa hết</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-xs text-neutral-500 hidden sm:block">
            Mẹo: Bé có thể dùng ngón tay hoặc chuột để tô từng mảng màu theo ý thích!
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Tải tác phẩm về máy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
