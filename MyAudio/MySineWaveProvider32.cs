using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyAudio
{
  public class MySineWaveProvider32 : MyWaveProvider32
  {
    private int sample;

    public MySineWaveProvider32()
    {
    }

    public override int Read(float[] buffer, int offset, int sampleCount)
    {
      int sampleRate = WaveFormat.SampleRate;
      for (int n = 0; n < sampleCount; n++)
      {        
        buffer[n + offset] = (float)(Amplitude * Math.Sin(2 * Math.PI * Frequency * sample / sampleRate));
        sample++;
        if (sample >= sampleRate) sample = 0;
      }
      return sampleCount;
    }
  }
}
