import re

with open('src/components/home/AboutSplit.tsx', 'r') as f:
    content = f.read()

# Add missing imports
if 'Layers' not in content:
    content = content.replace(
        '  Factory,\n} from "lucide-react";',
        '  Factory,\n  Layers,\n  Cpu,\n  PackageCheck,\n} from "lucide-react";'
    )

new_cards = """          {/* Right Column: 3 Tall Illustration Panels in Pastel Tones */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Panel 1: Panel Building Components */}
            <div className="group relative rounded-3xl bg-[#f0f7fd] p-6 text-[#0d2b4e] shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[360px] overflow-hidden border border-[#d6e8fa]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1a56b0] flex items-center justify-center mb-4 border border-[#bcdbf7] shadow-xs">
                  <Layers className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1a56b0] bg-white px-2 py-0.5 rounded-md border border-[#bcdbf7]">
                  Infrastructure
                </span>
                <h4 className="text-lg font-bold font-heading text-[#0d2b4e] mt-2">
                  Panel Building
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Distribution boxes, busbar insulators, flexible conduits, and terminals for robust assembly.
                </p>
              </div>

              {/* Vector Graphical Art Motif */}
              <div className="my-4 py-3 border-y border-[#d6e8fa] flex justify-around items-center bg-white/70 rounded-xl">
                <Layers className="w-5 h-5 text-amber-500" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <Zap className="w-5 h-5 text-[#1a56b0]" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <ShieldCheck className="w-5 h-5 text-[#0d2b4e]" />
              </div>

              <div className="text-[11px] font-bold text-[#1a56b0] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1a56b0]" />
                <span>Premium Quality</span>
              </div>
            </div>

            {/* Panel 2: Automation Components */}
            <div className="group relative rounded-3xl bg-[#f0f7fd] p-6 text-[#0d2b4e] shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[360px] overflow-hidden border border-[#d6e8fa] sm:translate-y-3">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-4 border border-[#bcdbf7] shadow-xs">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                  Control
                </span>
                <h4 className="text-lg font-bold font-heading text-[#0d2b4e] mt-2">
                  Industrial Automation
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  PLCs, Touchscreen HMIs, digital energy meters, and motor protection relays.
                </p>
              </div>

              {/* Vector Graphical Art Motif */}
              <div className="my-4 py-3 border-y border-[#d6e8fa] flex justify-around items-center bg-white/70 rounded-xl">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <div className="h-0.5 w-5 bg-emerald-400" />
                <Radio className="w-5 h-5 text-[#1a56b0]" />
                <div className="h-0.5 w-5 bg-emerald-400" />
                <Factory className="w-5 h-5 text-amber-500" />
              </div>

              <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fast Execution</span>
              </div>
            </div>

            {/* Panel 3: Global Sourcing */}
            <div className="group relative rounded-3xl bg-[#f0f7fd] p-6 text-[#0d2b4e] shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[360px] overflow-hidden border border-[#d6e8fa] sm:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1a56b0] flex items-center justify-center mb-4 border border-[#bcdbf7] shadow-xs">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0d2b4e] bg-white px-2 py-0.5 rounded-md border border-[#bcdbf7]">
                  Sourcing
                </span>
                <h4 className="text-lg font-bold font-heading text-[#0d2b4e] mt-2">
                  BOM Consolidation
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Turnkey multi-vendor procurement with genuine cross-referenced components.
                </p>
              </div>

              {/* Vector Graphical Art Motif */}
              <div className="my-4 py-3 border-y border-[#d6e8fa] flex justify-around items-center bg-white/70 rounded-xl">
                <PackageCheck className="w-5 h-5 text-indigo-500" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <ArrowRight className="w-5 h-5 text-[#1a56b0]" />
                <div className="h-0.5 w-5 bg-[#8abde9]" />
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="text-[11px] font-bold text-[#1a56b0] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1a56b0]" />
                <span>All Over the World</span>
              </div>
            </div>
          </div>"""

# Find the start of the Right Column
start_marker = "{/* Right Column: 3 Tall Illustration Panels in Pastel Tones */}"
end_marker = "        </div>\n      </div>\n    </section>\n  );\n}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    # We want to replace everything from start_marker up to the closing tags
    content = content[:start_idx] + new_cards + "\n" + content[end_idx:]

with open('src/components/home/AboutSplit.tsx', 'w') as f:
    f.write(content)

print("Done patching AboutSplit.tsx")
