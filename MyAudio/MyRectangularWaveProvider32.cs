using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyAudio
{
  public class MyRectangularWaveProvider32 : MyWaveProvider32
  {
    private int sample = 0;

    public override int Read(float[] buffer, int offset, int sampleCount)
    {
      float sampleRate = WaveFormat.SampleRate;
      float halfPeriode = 0.5f / Frequency;
      float periode = 1.0f / Frequency;

      for (int n = 0; n < sampleCount; n++)
      {
        float time = sample / sampleRate;
        sample++;

        if (time <= halfPeriode)
          buffer[n + offset] = Amplitude;
        else if (time < periode)
          buffer[n + offset] = -Amplitude;
        else
        { 
          buffer[n + offset] = -Amplitude;
          sample = 0;
        }
      }

      return sampleCount;
    }
  }
}
